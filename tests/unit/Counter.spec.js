import {shallowMount, createLocalVue} from "@vue/test-utils";
import Counter from "../../src/Counter";
import Vuex from "vuex";
import {state, getters, mutations, actions} from "../../src/store"

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
        let increaseButton = findButtonText(wrapper, "Increase");
        expect(increaseButton).toEqual("Increase");
    });

    // 3. Decrease button exist check
    test("The decrease button should exist", () => {
        let decreaseButton = findButtonText(wrapper, "Decrease");
        expect(decreaseButton).toEqual("Decrease");
    });

    // 4. Increase button functionality check
    test("Increase button should work", () => {
        // finds the Increase button
        let increaseButton = findButton(wrapper, "Increase");
        // Triggers the Increase button five times
        state.count = 0;
        triggerButton(increaseButton, 5);
        expect(state.count).toEqual(5);
    });

    // 5. Decrease button functionality check
    test("Decrease button should work", () => {
        // finds the Decrease button
        let decreaseButton = findButton(wrapper, "Decrease");
        // Triggers the Decrease button five times
        state.count = 5;
        triggerButton(decreaseButton, 5);
        expect(state.count).toEqual(0);
    });

    // 6. increase + decrease functionality check together
    test("Increase button should work", () => {
        // finds the Increase button
        let increaseButton = findButton(wrapper, "Increase");
        // finds the Decrease button
        let decreaseButton = findButton(wrapper, "Decrease");
        // Triggers the Increase button five times
        state.count = 0;
        triggerButton(increaseButton, 5);
        // Triggers the Decrease button five times
        triggerButton(decreaseButton, 5);
        expect(state.count).toEqual(0);
    });

    // 7. Count text show check
    test("Count text should show", () => {
        const text = wrapper.find("span").element.textContent;
        expect(text).toEqual(`${state.count}k`);
    });

});

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

// finds the increase/decrease buttons
function findButton(wrapper, button) {
    let btn = wrapper.findAll("button");
    for (let i = 0; i < btn.length; i++) {
        if (btn.at(i).element.textContent === button) {
            return btn.at(i);
        }
    }
}

// finds the increase/decrease buttons' text
function findButtonText(wrapper, button) {
    let btn = wrapper.findAll("button");
    for (let i = 0; i < btn.length; i++) {
        if (btn.at(i).element.textContent === button) {
            return btn.at(i).element.textContent;
        }
    }
}

// triggers the increase/decrease buttons
function triggerButton(button, times) {
    for (let i = 0; i < times; i++) {
        button.trigger("click");
    }
}
