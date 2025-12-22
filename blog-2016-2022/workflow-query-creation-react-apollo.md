---
date: 2018-03-06
modified_at: 2018-03-06
---

# Workflow query creation (React Apollo)

> This article is part of a series on building an MVP of a Data-driven
cross-platform app with the following stack: React Native, Apollo GraphQL, and
on the backend Node JS with Express and a MySQL Database.


This is the workflow I use whenever I need new data in my app. This way, it goes
super-fast. Yeah. That's the benefit of being full-stack!

 * What do I want to show to the user, which fields do I need?
   
   
 * Schema (Index)
   
   
 * Connectors needed? API-REST is also a connector
   
   
 * Resolvers? Edit resolvers.js, routines/index.js, and the {resolvername}.js 
   files
   
   
 * Write resolver and optional extra routines. Use model/connection from
   connectors.
   
   
 * Test query in GraphiQL
   
   
 * Create client side gql query and options at 'import.tsx'.
   (know format well) (know options format well)
   
   
 * import {compose, graphql} from 'react-apollo'; supply this to a component
   
   
 * use the resulting const {data: {queryname}} = this.props; to show what I
   want. If this is an array, use <FlatList />. FlatList is awesome!