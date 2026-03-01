import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListPage } from './presentation/pages/todo-list/todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
