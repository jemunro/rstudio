/*
 * SessionQuartoServe.hpp
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

#ifndef SESSION_QUARTO_SERVE_HPP
#define SESSION_QUARTO_SERVE_HPP

#include <string>

namespace rstudio {
namespace core {
   class Error;
   class FilePath;
}
}

namespace rstudio {
namespace session {
namespace modules {
namespace quarto {
namespace serve {

void previewDoc(const std::string& renderOutput, const std::string& path);
void previewDocPath(const std::string& renderOutput, const core::FilePath& docPath);

core::Error initialize();
   
} // namespace serve
} // namespace quarto
} // namespace modules
} // namespace session
} // namespace rstudio

#endif
