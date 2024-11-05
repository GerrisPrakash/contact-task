// model/Post.js
import { Model } from '@nozbe/watermelondb'
import {field, text} from '@nozbe/watermelondb/decorators'

export default class Tasks extends Model {
  static table = 'tasks';

  @text('name') name: string;
  @text('number') number: string;
  @text('todo') todo: string;
  @text('status') status: string;
}