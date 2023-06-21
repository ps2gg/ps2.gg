## Real-time Communication (wip)

Real-time data is vital to a lot of our services, so we made its distribution as easy as possible.<br>
You can make any change in the database available to WebSocket clients via the `@Subscribable` decorator, like so:

<br>

```js
// /domain/Entity/RatingEntity
...
import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'

@Entity()
@Subscribable()
export class RatingEntity extends AggregateRoot implements SubscribableEntity {
  @PrimaryColumn('text')
  readonly userId: string

  @Column('int')
  readonly elo: number

  @Column('text')
  readonly scope: string // <- Don't forget this, it's how we know what to subscribe to

  @Column('boolean')
  readonly resetReceivedState: boolean // <- And this is how we can reset long-term events (more below)
}
```

<br>

Now every time a new Rating is added, or a Rating's `elo` attribute is changed, we receive an event in our WebSocket clients.<br>

TODO: Add Client example

We can even set conditions for when the event should fire, such as a specific time frame, or when conditions on an attribute are met.

TODO: Show configuration options

<br>

## Long-term events
