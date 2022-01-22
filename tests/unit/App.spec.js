import {createLocalVue, mount} from "@vue/test-utils";
import App from "../../src/App";
import Vuex from "vuex";
import {state, getters, mutations, actions} from "../../src/store";

// Test case for App.vue
describe("App.vue", () => {

    // mounts App.vue before each test.
    let wrapper;
    beforeEach(() => {
        wrapper = mountComponent(App);
    });

    // 1. h1 exists
    test("h1 should exist", () => {
        const h1 = wrapper.find("h1");
        expect(h1.exists()).toBeTruthy();
    });

    // 2. h1 text equals to Daily Corona Cases in Turkey check
    test("h1's text should equal to (Daily Corona Cases in Turkey)", () => {
        const text = "Daily Corona Cases in Turkey";
        const textOfH1 = wrapper.find("h1").element.textContent;
        expect(textOfH1).toEqual(text);
    });

    // 3. notificationArea class check based on getCount value
    test("notificationArea class check based on getCount value", () => {

        // looks for safe class
        const safe = "safe";
        const safeClass = findClass(wrapper, safe);
        expect(safeClass).toEqual(safe);

        // looks for normal class
        state.count = 5;
        wrapper = mountComponent(App);
        const normal = "normal";
        const normalClass = findClass(wrapper, normal);
        expect(normalClass).toEqual(normal);

        // looks for danger class
        state.count = 10;
        wrapper = mountComponent(App);
        const danger = "danger";
        const dangerClass = findClass(wrapper, danger);
        expect(dangerClass).toEqual(danger);
    });

    // 4. notificationArea text message check
    test("notificationArea text message check", () => {

        // Looks for safe text
        state.count = 0;
        wrapper = mountComponent(App);
        const safeMessage = `So safe. Case count is ${state.count}k`;
        const safeText = findText(wrapper, safeMessage);
        expect(safeText).toEqual(safeMessage);

        // Looks for normal text
        state.count = 5;
        wrapper = mountComponent(App);
        const normalMessage = `Life is normal. Case count is ${state.count}k`;
        const normalText = findText(wrapper, normalMessage);
        expect(normalText).toEqual(normalMessage);

        // Looks for danger text
        state.count = 10;
        wrapper = mountComponent(App);
        const message = `Danger!!! Case count is ${state.count}k`;
        const dangerText = findText(wrapper, message);
        expect(dangerText).toEqual(message);
    });
});

// function for mounting App.vue component using localVue
function mountComponent(Component) {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    return mount(Component, {
        localVue,
        store: new Vuex.Store({
            state,
            getters,
            mutations,
            actions
        })
    });
}

// finds notificationArea class
function findClass(wrapper, Class) {
    let divs = wrapper.findAll("div");
    for (let i = 0; i < divs.length; i++) {
        if (divs.at(i).classes().includes(Class)) {
            return divs.at(i).classes().filter(n => n === Class).toString();
        }
    }
}

// finds notificationArea text message
function findText(wrapper, message) {
    let divs = wrapper.findAll("div");
    for (let i = 0; i < divs.length; i++) {
        if (divs.at(i).element.textContent.trim() === message) {
            return divs.at(i).element.textContent.trim();
        }
    }
}
