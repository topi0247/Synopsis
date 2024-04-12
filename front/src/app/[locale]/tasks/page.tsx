import React from "react";
import { H2 } from "../components/ui/h2";

const tasks = [
  {
    id: 1,
    title: "タスク１",
    description: "説明",
    is_done: false,
  },
  {
    id: 2,
    title: "タスク２",
    description: "説明",
    is_done: false,
  },
  {
    id: 3,
    title: "タスク３",
    description: "説明",
    is_done: true,
  },
];

const TasksIndex = () => {
  return (
    <article className="w-full m-auto">
      <H2>タスク一覧</H2>
      <dl className="w-96 mx-auto my-8">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id}>
              <dt>
                <label className="mr-1">
                  <input type="checkbox" />
                </label>
                {task.title}
              </dt>
              <dd className="ml-8">{task.description}</dd>
            </div>
          ))
        ) : (
          <p>タスクがありません</p>
        )}
      </dl>
    </article>
  );
};

export default TasksIndex;
