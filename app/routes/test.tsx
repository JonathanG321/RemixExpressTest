import { type MetaFunction, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Test() {
  const { test } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix </h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
          {test}
        </li>
      </ul>
    </div>
  );
}

export async function loader() {
  await delay(30_000);
  console.log('test1');
  await delay(30_000);
  console.log('test2');
  await delay(30_000);
  console.log('test3');
  await delay(30_000);
  console.log('test4');
  await delay(30_000);
  console.log('test5');
  await delay(30_000);
  console.log('test complete');
  return json({ test: 'test' });
}

function delay(timems: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timems);
  });
}
