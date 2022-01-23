import {createLocalVue, mount} from "@vue/test-utils";
import App from "../../src/App";
import Vuex from "vuex";
import {state, getters} from "../../src/store";

// Test case for App.vue
describe("App.vue", () => {

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
    describe("notificationArea class check based on getCount value", () => {

        // looks for safe class
        test("notificationArea should include safe class", async () => {
            const safe = "safe";
            const safeClass = findClass(wrapper, safe);
            expect(safeClass).toEqual(safe);
        });

        // looks for normal class
        test("notificationArea should include normal class", async () => {
            wrapper.vm.$store.state.count = 5;
            await wrapper.vm.$nextTick();
            const normal = "normal";
            const normalClass = findClass(wrapper, normal);
            expect(normalClass).toEqual(normal);
        });

        // looks for danger class
        test("notificationArea should include danger class", async () => {
            wrapper.vm.$store.state.count = 10;
            await wrapper.vm.$nextTick();
            const danger = "danger";
            const dangerClass = findClass(wrapper, danger);
            expect(dangerClass).toEqual(danger);
        });
    });

    // 4. notificationArea text message check
    describe("notificationArea text message check", () => {

        // Looks for safe text
        test("notificationArea text message should include safe text", async () => {
            wrapper.vm.$store.state.count = 0;
            await wrapper.vm.$nextTick();
            const safeMessage = `So safe. Case count is ${state.count}k`;
            const safeText = findText(wrapper, safeMessage);
            expect(safeText).toEqual(safeMessage);
        });

        // Looks for normal text
        test("notificationArea text message should include normal text", async () => {
            wrapper.vm.$store.state.count = 5;
            await wrapper.vm.$nextTick();
            const normalMessage = `Life is normal. Case count is ${state.count}k`;
            const normalText = findText(wrapper, normalMessage);
            expect(normalText).toEqual(normalMessage);
        });

        // Looks for danger text
        test("notificationArea text message should include danger text", async () => {
            wrapper.vm.$store.state.count = 10;
            await wrapper.vm.$nextTick();
            const message = `Danger!!! Case count is ${state.count}k`;
            const dangerText = findText(wrapper, message);
            expect(dangerText).toEqual(message);
        });
    });
});

// mounts App.vue component using localVue and store
function mountComponent(Component) {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    return mount(Component, {
        localVue,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}

// finds notificationArea's class
function findClass(wrapper, Class) {
    let notificationArea = wrapper.find(".notificationArea")
    if (notificationArea.classes().includes(Class)) {
        return Class;
    }
}

// finds notificationArea's text message
function findText(wrapper, message) {
    let divs = wrapper.findAll("div");
    for (let i = 0; i < divs.length; i++) {
        if (divs.at(i).text() === message) {
            return divs.at(i).text();
        }
    }
}
