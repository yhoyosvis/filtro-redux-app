import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';
import { from } from 'rxjs';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const estadoInicial: Todo[] = [todo1, todo2];
todo2.completado = true;
export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {

    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case fromTodo.TOGGLE_TODO:   /* Este case cambia todo el completado, se genera el if para no mutar los cmabios por referencia */
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.EDITAR_TODO:   /* este caso es para editar la tarea */
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });


        case fromTodo.ELIMINAR_TODO: /* Este caso es para eliminar un todo */
            return state.filter(todoEdit => todoEdit.id !== action.id);



        case fromTodo.LIMPIAR_COMPLETADOS:
            return state.filter(todoEdit => !todoEdit.completado);

        default:
            return state;

    }
}
