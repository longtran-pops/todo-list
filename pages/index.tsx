import 'mobx-react-lite/batchingForReactDom';
import Head from 'next/head'
import TaskList from 'components/TaskList'
import TaskInput from 'components/TaskInput'
import {TodoService} from "../service/todo.service";
export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Todo Task Web App</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <main style={{ maxWidth: '966px', margin: 'auto' }}>
        <TaskInput />
        <TaskList />
        <button onClick={TodoService.saveToServer}>Save to server</button>
        <button onClick={TodoService.loadFromServer}>Load from server</button>
      </main>
    </div>
  )
}
