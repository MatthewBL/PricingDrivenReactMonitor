export interface TableState<T> {
  index: number;
  data: Array<T>;
}

export type Action<T> =
  | { type: "add_item"; payload: T }
  | { type: "update_item"; payload: T }
  | { type: "delete_item" }
  | { type: "select_item"; index: number };

export function tableReducer<T>(
  state: TableState<T>,
  action: Action<T>
): TableState<T> {
  switch (action.type) {
    case "add_item": {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case "update_item": {
      return {
        ...state,
        data: state.data.map((attribute, index) =>
          index === state.index ? action.payload : attribute
        ),
      };
    }
    case "delete_item": {
      return {
        ...state,
        data: state.data.filter((_, index) => index !== state.index),
      };
    }
    case "select_item": {
      return {
        ...state,
        index: action.index,
      };
    }
  }
}
