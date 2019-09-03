This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Challenge Connectronic

Criação de um CRUD.
* Desenvolver usando React e Material-UI 
* Todo item possui nome e descrição
* Exclusão necessita confirmação

Servidor NodeJS criado com ExpressJs e MongoDB/Mongoose

## Instalação

`git clone https://github.com/minggas/Connectronic-Challenge.git`

`cd Connectronic-Challenge`

`yarn install`

### install server
`cd server`

`yarn install`

## How to run

### RUN SERVER
`cd server`

`export DB=YOUR_MONGODB_URI PORT=8080`

#### run dev server
`yarn dev`

#### run tests
`yarn test`

### RUN CLIENT
#### run dev server
`yarn start`

#### run build prod
`yarn build`

#### run tests
`yarn test`

## Telas de mock-up

### Dashboard 

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/dashboard.png "Dashboard view")

### Lista de items

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/lista.png "Add Button")

### Botão Adicionar

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/add.png "Add Button")

### Tela de criaçao de novo item

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/additem.png "Add Button")

### Botão para editar item

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/editar.png "Add Button")

### Tela de ediçao de novo item

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/editaitem.png "Add Button")

### Botão para apagar item
![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/deleteitem.png "Add Button")

### Dialogo de confirmação antes da exclusão

![alt text](https://github.com/Wellers0n/Connectronic-Challenge/raw/master/img/apagar.png "Add Button")

## Dependencies

Além das dependencies normais do create-react-app:
* Material-UI (core/icons)
* Material Tables
* @testing-library/react
* clsx
* axios

Server dependencies:
* body-parser
* cors
* express
* helmet
* mongodb
* mongoose
