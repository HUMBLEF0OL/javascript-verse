import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string,
        direction: direction
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string
}

export interface InsertCellBeforeAction {
    type: ActionType.INSERT_CELL_BEFORE;
    payload: {
        id: string,
        type: CellTypes
    }

}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string,
        content: string
    }
}

export type direction = 'up' | 'down';

export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;