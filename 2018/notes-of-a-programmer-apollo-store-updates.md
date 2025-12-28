---
date: 2018-03-06
modified_at: 2018-03-06
tags: [apollo, graphql, programming, nodejs, coding]
---

# [Notes of a programmer]: Apollo store updates

> These are my notes. Fuck you.
It's just what I do. If you want a complete overview, better read the original
documentation, haha :D 
https://www.apollographql.com/docs/react/features/cache-updates.html


Apollo store can be seen in RND

apollo identifies an objet by its __typename and id (must be _id or id)
let's call it object-id htey call it dataIDFromObject)
__typename is automatically added

Apollo 2.0 store is 5-10x faster because it doesn't need redux cache

There are 4 ways to get/change data from the store

 1. Automatic store updates happen
    if mutation results contain the ID and the affected field! Figure out a way
    to do this with sequelize!
    
    
 2. refetchQueries: [{query, variables }]
    supply that to mutate
    
    
 3. update: (store, {data: {....} }) => { full cotrol over the store via
    store.readquery, store.readfragment, store.writequery, store.writefragment
    with ({query, ?data}) as options }
    
    
 4. optimisticResponse { optimisticObject } <-- See docs for good examples
    
    

 * option 1 is the best but may only work on updates dat return the right
   format. Therefore it is essential to use fragments so that no attributes can
   be undefined.
 * option 3 is never needed but may be more efficient than option 2. but it's
   also more boilerplate. However, there are gonna be more straightforward
   solutions to option 3 in the future.
 * option 2 always works but launches more queries, obviously, which can be
   predicted sometimes... to keep the MVP simple use this as much as possible.
 * option 4 is awesome for instant gratification. if the server starts being
   slower, this will deliver a very smooth UX. but it's a lot of boilerplate.