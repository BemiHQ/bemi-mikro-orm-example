import './style.css';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

import { generateClient } from 'aws-amplify/api';
import { createTodo } from './src/graphql/mutations';
import { listTodos } from './src/graphql/queries';
import { onCreateTodo } from './src/graphql/subscriptions';

Amplify.configure(amplifyconfig);

const client = generateClient();

const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');
const QueryResult = document.getElementById('QueryResult');
const SubscriptionResult = document.getElementById('SubscriptionResult');

async function addTodo() {
  const todo = {
    name: 'Use AppSync',
    description: `Realtime and Offline (${new Date().toLocaleString()})`
  };

  return await client.graphql({
    query: createTodo,
    variables: {
      input: todo
    }
  });
}

async function fetchTodos() {
  try {
    const response = await client.graphql({
      query: listTodos
    });

    response.data.listTodos.items.map((todo, i) => {
      QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
    });
  } catch (e) {
    console.log('Something went wrong', e);
  }
}

MutationButton.addEventListener('click', (evt) => {
  addTodo().then((evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
  });
});

function subscribeToNewTodos() {
  client.graphql({ query: onCreateTodo }).subscribe({
    next: (evt) => {
      const todo = evt.data.onCreateTodo;
      SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
    }
  });
}

subscribeToNewTodos();
fetchTodos();
