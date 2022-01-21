import {shallowMount, createLocalVue} from "@vue/test-utils";
import Counter from "../../src/Counter";
import Vuex from "vuex";
import {state, getters, mutations, actions} from "../../src/store"

// function for shallow mounting the Counter component using localVue
function shallowMountComponent(Component) {

    const localVue = createLocalVue();
    localVue.use(Vuex);

    return shallowMount(Component, {
        localVue,
        store: new Vuex.Store({
            state,
            getters,
            mutations,
            actions
        })
    });
}

// Test case for Counter.vue
describe("Counter.vue", () => {

    // shallow mounts Counter.vue component before each test.
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMountComponent(Counter);
    });

    // 1. Component Exist Check
    test("Counter component should exist", () => {
        expect(wrapper.exists).toBeTruthy();
    });

    // 2. Increase button exist check
    test("The increase button should exist", () => {
        let button = wrapper.findAll("button");
        for (let i = 0; i < button.length; i++) {
            if (button.at(i).element.textContent === "Increase") {
                button = button.at(i).element.textContent;
                break;
            }
        }
        expect(button).toEqual("Increase");
    });

    // 3. Decrease button exist check
    test("The decrease button should exist", () => {
        let button = wrapper.findAll("button");
        for (let i = 0; i < button.length; i++) {
            if (button.at(i).element.textContent === "Decrease") {
                button = button.at(i).element.textContent;
                break;
            }
        }
        expect(button).toEqual("Decrease");
    });

    // 4. Increase button functionality check
    test("Increase button should work", () => {
        let button = wrapper.findAll("button");
        for (let i = 0; i < button.length; i++) {
            if (button.at(i).element.textContent === "Increase") {
                button = button.at(i);
            }
        }
        // Triggers the Increase button five times
        state.count = 0;
        let count = 0;
        for (let i = 0; i < 5; i++) {
            button.trigger("click");
            count++;
        }
        expect(state.count).toEqual(count);
    });

    // 5. Decrease button functionality check
    test("Decrease button should work", () => {
        let button = wrapper.findAll("button");
        for (let i = 0; i < button.length; i++) {
            if (button.at(i).element.textContent === "Decrease") {
                button = button.at(i);
            }
        }
        // Triggers the Decrease button five times
        state.count = 5;
        let count = 5;
        for (let i = 0; i < 5; i++) {
            button.trigger("click");
            count--;
        }
        expect(state.count).toEqual(count);
    });

    // 6. 2 increase + decrease functionality check together
    test("Increase button should work", () => {
        let button = wrapper.findAll("button");
        let increaseButton;
        let decreaseButton
        for (let i = 0; i < 2; i++) {
            if (button.at(i).element.textContent === "Increase") {
                increaseButton = button.at(i);
            } else if (button.at(i).element.textContent === "Decrease") {
                decreaseButton = button.at(i);
            }
        }
        // Triggers the Increase button five times
        state.count = 0;
        let count = 0;
        for (let i = 0; i < 5; i++) {
            button.trigger("click");
            count++;
        }
        // Triggers the Decrease button five times
        for (let i = 0; i < 5; i++) {
            button.trigger("click");
            count--;
        }
        expect(state.count).toEqual(count);
    });

    // 7. Count text show check
    test("Count text should show", () => {
        const text = wrapper.find("span").element.textContent;
        expect(text).toEqual(`${state.count}k`);
    });

});
