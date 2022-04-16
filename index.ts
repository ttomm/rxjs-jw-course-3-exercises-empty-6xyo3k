import { Observable } from 'rxjs';

const observable$ = new Observable((subscriber) => {
  console.log('Inside observable');
  subscriber.next('First VALUE');
  subscriber.next('Second VALUE');
  setTimeout(() => {
    subscriber.next('Third VALUE'); // won't be executed because of "unsubscribe" below
    subscriber.complete(); // won't be executed because of "unsubscribe" below
  }, 2000);

  return () => {
    console.log('TeardownLogic');
  };
});

console.log('Before subscription');
const sub = observable$.subscribe({
  next: (val) => console.log(`VAL: ${val}`),
  complete: () => console.log('Emitting finished'),
});

sub.unsubscribe();
