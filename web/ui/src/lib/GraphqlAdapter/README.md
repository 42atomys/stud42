# Next-Auth Stud42 Adapter

To create a custom next-auth adapter, you can follow the documentation: 
https://next-auth.js.org/tutorials/creating-a-database-adapter

In your case we only support OAUTH strategy via JWT and the creation of an User
will be only done when the connection is performed by DUO (42API)

## Complex Adapter logic
To simplify the understanding of Stud42's GraphQL adapter, here is a schema that includes only the functions used by him
```mermaid
  graph TD
    0(User has logged out)--> A
    A(User authenticated with Oauth)-->|Call adapter| B
    B(internalGetUserByAccount)-->BC
    BC{User exists?} -->|Yes| F
    BC -->|No| C
    C(internalGetUserByEmail)-->CC
    CC{User Exists?} -->|Yes| FAIL[Email already exists on database<br/> but email not linked. <br/><font color=red>Throw Error</font>]
    CC -->|No| D
    D(createUser)-->E
    E(linkAccount) --> F

    F(Generate JWT<br/><font color=gree>Success</font>)

    01(User has logged in) -->A1
    A1(User authenticated with same or<br/> another Oauth)-->|Call adapter| B1
    B1(internalGetUser)--> C1
    C1(internalGetUserByAccount)-->CC1
    CC1{User exists?} -->|Yes| F
    CC1 -->|No| D
```

## Simplified connection flow
Simplified connection flow with DUO (42API) and Github (works same with others providers)
```mermaid
graph LR
  classDef duo stroke:#6e5494;
  classDef github stroke:#4078c0;
  classDef error stroke:Crimson,color:Crimson;
  classDef success stroke:LawnGreen,color:LawnGreen;
  
  A1(DUO):::duo --> B1{Logged ?}:::duo
  B1 --->|Yes| E1(Success <br/>Generate JWT):::success
  B1 -->|No| F1([Adapter Logic]) --> E1

  A2(GITHUB):::github --> B2{Logged ?}:::github
  B2 -->|YES|C21(Link account to existing User):::github --> E1
  B2 --->|No|C22{{Error<br/> Must have DUO Context to login}}:::error
```
