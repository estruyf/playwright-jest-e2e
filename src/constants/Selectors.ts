/**
 * Pages
 */
export const PAGE_EDIT = `button[data-automation-id="pageCommandBarEditButton"]`;
export const PAGE_SAVE = `button[data-automation-id="pageCommandBarSaveButton"]`;

/**
 * Web parts
 */
export const CONTROL_ZONE = `[data-automation-id="CanvasZone"]`;
export const WEBPART_TOOLBOX = `[data-automation-id="canvas-control-toolbar"]`;
export const WEBPART_EDIT = `${WEBPART_TOOLBOX}:nth-child(1) > .ms-TooltipHost:nth-child(1) > .ToolbarButton`;

/**
 * Property pane
 */
export const TEXT_INPUT_FIELDS = `#spPropertyPaneContainer input[type="text"]`;