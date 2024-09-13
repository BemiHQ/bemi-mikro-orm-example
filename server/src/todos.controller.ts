import { Request, Response } from "express";

import { Todo } from "./todo.entity";
import { DI } from "./di";

export const todos = async (_req: Request, res: Response): Promise<void> => {
  const data = await DI.orm.em.find(Todo, {});
  res.status(200).json(data);
};

export const todo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  const todo = new Todo({ task });
  await DI.orm.em.persistAndFlush(todo);
  res.status(201).json({ message: "Todo added", todo });
};

export const complete = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.body?.id);

  const todo = await DI.orm.em.findOne(Todo, id) as Todo;
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    await DI.orm.em.persistAndFlush(todo);
    res.status(200).json({ message: `Todo changed to ${todo.isCompleted}` });
  } else {
    res.status(404).json({ message: "No Todo found" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params?.id);
  const todo = await DI.orm.em.findOne(Todo, id);
  if (todo) {
    await DI.orm.em.removeAndFlush(todo);
    res.status(204).json({ message: "Todo successfully deleted" });
  } else {
    res.status(404).json({ message: "No Todo found" });
  }
};
