/*
 * xref.ts
 *
 * Copyright (C) 2020 by RStudio, PBC
 *
 * Unless you have received this program directly from RStudio pursuant
 * to the terms of a commercial license agreement with RStudio, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */


import { Node as ProsemirrorNode } from 'prosemirror-model';
import { pandocAutoIdentifier } from './pandoc_id';

export interface XRefServer {
  indexForFile: (file: string) => Promise<XRefs>;
  xrefForId: (file: string, id: string) => Promise<XRefs>;
}

export interface XRefs {
  baseDir: string;
  refs: XRef[];
}

export interface XRef {
  file: string;
  type: string;
  id: string;
  title: string;
}

export function xrefKey(xref: XRef) {
  return xref.type.length > 0 ? `${xref.type}:${xref.id}` : xref.id;
}

export function xrefPosition(doc: ProsemirrorNode, xref: string): number {

  // alias schema
  const schema = doc.type.schema;

  // get type and id
  const { type, id } = xrefTypeAndId(xref);

  // search all descendents recursively for the xref
  let xrefPos = -1;
  doc.descendants((node, pos) => {

    // bail if we already found it
    if (xrefPos !== -1) {
      return false;
    }

    // see if we have a locator for this type that can handle this node type
    const locator = xrefPositionLocators[type];
    if (locator && locator.nodeTypes.includes(node.type.name)) {
      if (locator.hasXRef(node, id)) {
        xrefPos = pos;
        return false;
      }
    }
  });

  // return the position
  return xrefPos;
}



function xrefTypeAndId(xref: string) {
  const colonPos = xref.indexOf(':');
  if (colonPos !== -1) {
    return {
      type: xref.substring(0, colonPos),
      id: xref.substring(colonPos + 1)
    };
  } else {
    return {
      type: 'heading',
      id: xref
    };
  }
}

interface XRefPositionLocator {
  nodeTypes: [string];
  hasXRef: (node: ProsemirrorNode, id: string) => boolean;
}

const xrefPositionLocators: { [key: string]: XRefPositionLocator } = {
  'heading': {
    nodeTypes: ['heading'],
    hasXRef: (node: ProsemirrorNode, id: string) => {
      return node.attrs.id === id || pandocAutoIdentifier(node.textContent) === id;
    }
  }
};



