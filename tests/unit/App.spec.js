import {createLocalVue, shallowMount} from "@vue/test-utils";
import App from "../../src/App";
import Vuex from "vuex";
import {state, getters} from "../../src/store";

// function for shallow mounting the Counter component using localVue
function shallowMountComponent(Component) {

    const localVue = createLocalVue();
    localVue.use(Vuex);

    return shallowMount(Component, {
        localVue,
        store: new Vuex.Store({
            state,
            getters
        })
    });
}

// Test case for App.vue
describe("App.vue", () => {
    // shallow mounts App.vue before each test.
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMountComponent(App);
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

    // looks for safe class
    describe("safe class", () => {
        beforeEach(() => {
            state.count = 0;
        })
        test("should include the safe", () => {
            let div = wrapper.findAll("div").at(2);
            expect(div.classes()).toContain("safe");
        });
    });

    // looks for normal class
    describe("normal class", () => {
        beforeEach(() => {
            state.count = 5;
        })
        test("should include the normal", () => {
            let div = wrapper.findAll("div").at(2);
            expect(div.classes()).toContain("normal");
        });
    });

    // looks for danger class
    describe("danger class", () => {
        beforeEach(() => {
            state.count = 10;
        })
        test("should include the danger", () => {
            let div = wrapper.findAll("div").at(2);
            expect(div.classes()).toContain("danger");
        });
    });

    // 4. notificationArea text message check

    // Looks for safe text
    describe("safe text", () => {
        beforeEach(() => {
            state.count = 0;
        });
        test("notification area message should include (So safe)", () => {
            const message = wrapper.findAll("div").at(2).element.textContent.trim();
            expect(message).toEqual(`So safe. Case count is ${state.count}k`);
        });
    });

    // Looks for normal text
    describe("normal text", () => {
        beforeEach(() => {
            state.count = 5;
        });
        test("notification area message should include (Life is normal)", () => {
            const message = wrapper.findAll("div").at(2).element.textContent.trim();
            expect(message).toEqual(`Life is normal. Case count is ${state.count}k`);
        });
    });

    // Looks for danger text
    describe("danger text", () => {
        beforeEach(() => {
            state.count = 10;
        });
        test("notification area message should include (Danger!!!)", () => {
            const message = wrapper.findAll("div").at(2).element.textContent.trim();
            expect(message).toEqual(`Danger!!! Case count is ${state.count}k`);

        });
    });

});
