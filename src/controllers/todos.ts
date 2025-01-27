import { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/todo';

const todos: Todo[] = []

class TodoController {
    createTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = (req.body as {task: string}).task
            const newTodo = new Todo(Math.random().toString(), task)
            todos.push(newTodo)
            res.status(201).json({
                message: 'Created new todo',
                createdTask: newTodo
            })
        } catch (error) {
            console.log(error)
        }
    }

    getTodos = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({
                message: "Todos received",
                tasks: todos
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id
            const updatedTask = (req.body as {task: string}).task
            const todoIndex = todos.findIndex(todo => todo.id === todoId)

            if (todoIndex < 0) {
                throw new Error('Could not find todo with this id')
            }

            todos[todoIndex] = new Todo(todos[todoIndex].id, updatedTask)

            res.status(200).json({
                message: 'Updated todo',
                updatedTask: todos[todoIndex]
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteTodo = (req: Request, res: Response, next: NextFunction) => {
        try {
            const todoId = req.params.id

            const todoIndex = todos.findIndex(todo => todo.id === todoId)

            if (todoIndex < 0) {
                throw new Error('Could not find todo with this id')
            }

            todos.splice(todoIndex, 1)

            res.status(200).json({
                message: 'Deleted the todo'
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default new TodoController();
