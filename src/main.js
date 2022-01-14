import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
import { reactive, watchEffect } from "./reactive";
import "./assets/css/style.css";
import usersApi from "./api/users";

// https://github.com/snabbdom/snabbdom#key--string--number

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const app = document.getElementById("app");

const fetchData = async () => {
  const list = await usersApi.getList();
  return list;
};

const initial = async () => {
  const list = await fetchData();
  state.lastId = list[list.length - 1].id;
  state.list = list;
};

// eslint-disable-next-line no-unused-vars
const state = reactive({
  lastId: 0,
  list: []
});

function render() {
  return h("main.main", [
    h("div.btn-group", [
      h("button", { on: { click: add } }, "Добавить"),
    ]),
    h("div.container", [
      h(
        "div",
        state.list.map(({
          name,
          description,
          imgUrl,
          id
        }) => {
          return h(
            "section.list-item",
            { key: id },
            [
              h("img.list-item-img", {
                props: {
                  src: imgUrl
                }
              }),

              h("div.list-item-content", [
                h(
                  "h4.list-item-title",
                  name
                ),
                h(
                  "p.list-item-description",
                  description
                ),
                h("button", { key: id, on: { click: remove.bind(this, id) } }, "Удалить")
              ])
            ]
          );
        })
      )
    ])
  ])
}

function add() {
  state.lastId++;
  state.list = [...state.list, {
    id: state.lastId,
    name: `test_name_${state.lastId}`,
    description: "test_description",
    imgUrl: state.list[0].imgUrl
  }]
  
}

function remove(id) {
  state.list = state.list.filter(user => user.id !== id);
}

let previousVnode = null;

initial();

watchEffect(() => {
  const vnode = render();
  patch(previousVnode || app, vnode);
  previousVnode = vnode;
});
