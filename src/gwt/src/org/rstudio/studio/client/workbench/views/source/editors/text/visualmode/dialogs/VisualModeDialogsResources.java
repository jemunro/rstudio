/*
 * VisualModeDialogsResources.java
 *
 * Copyright (C) 2022 by Posit Software, PBC
 *
 * Unless you have received this program directly from Posit Software pursuant
 * to the terms of a commercial license agreement with Posit Software, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */



package org.rstudio.studio.client.workbench.views.source.editors.text.visualmode.dialogs;


import com.google.gwt.resources.client.CssResource;


import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ClientBundle;

public interface VisualModeDialogsResources extends ClientBundle
{
   interface Styles extends CssResource
   {
      String confirmDialog();
      String confirmLineWrappingDialog();
      String lineWrappingRadio();
      String lineWrappingHelp();
      String wrapAtColumn();
   }

   @Source("VisualModeDialogs.css")
   Styles styles();
   
   static VisualModeDialogsResources INSTANCE = GWT.create(VisualModeDialogsResources.class);

   public static void ensureStylesInjected()
   {
      INSTANCE.styles().ensureInjected();
   }

}
