/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import Util = require('../lighthouse-core/report/html/renderer/util.js');

declare global {
  module LH {
    // TODO(bckenny): maybe LH.Icu<> instead?
    // TODO(bckenny): don't recurse into already existing IcuMessages?
    type I18n<T> = string extends T ?
      // All strings can also be an LH.IcuMessage
      (T | IcuMessage) :
      // Otherwise recurse into any properties and make the same change.
      {[K in keyof T]: I18n<T[K]>};

    type FormattedI18n<T> = IcuMessage extends T ?
      // All LH.IcuMessages replaced with strings.
      Exclude<T, IcuMessage> | string :
      // Otherwise recurse into any properties and make the same change.
      {[K in keyof T]: FormattedI18n<T[K]>};

    // TODO(bckenny): should IcuMessage be just the string, and have an IcuMessageEntry/Instance or something for this object?
    export type IcuMessage = {
      // TODO(bckenny): make a more distinctive i18nId or something?
      id: string;
      values?: Record<string, string | number>;
      // TODO(bckenny): in practice is this ever a preformatted one? Or always a UIStrings backup? swap-locales has a formatted backup in the lhr itself. We really need a UIStrings backup for e.g. gatherer messages that don't exist anymore
      /** The original string given in 'UIStrings', optionally used as a backup if no locale message can be found. */
      uiStringMessage?: string,
    };

    // TODO(bckenny): switch back to IcuMessagePaths to match lhr var name?
    export interface IcuMessagesByPath {
      [path: string]: IcuMessage;
    }

    // TODO(bckenny): why is it important to have this specifically keyed?
    export type I18NRendererStrings = typeof Util['UIStrings'];
  }
}

// empty export to keep file a module
export {}
