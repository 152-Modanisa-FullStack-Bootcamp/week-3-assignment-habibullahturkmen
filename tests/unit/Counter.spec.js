import {shallowMount, createLocalVue} from "@vue/test-utils";
import Counter from "../../src/Counter";
import Vuex from "vuex";
import {state, getters, mutations, actions} from "../../src/store"

// Test case for Counter.vue
describe("Counter.vue", () => {

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
        let increaseButton = findButton(wrapper, "Increase");
        triggerButton(increaseButton, 5);
        expect(wrapper.vm.$store.state.count).toEqual(5);
    });

    // 5. Decrease button functionality check
    test("Decrease button should work", () => {
        let decreaseButton = findButton(wrapper, "Decrease");
        triggerButton(decreaseButton, 5);
        expect(wrapper.vm.$store.state.count).toEqual(0);
    });

    // 6. 2 increase + 1 decrease functionality check together
    test("2 increase + 1 decrease functionality check together", () => {
        let increaseButton = findButton(wrapper, "Increase");
        let decreaseButton = findButton(wrapper, "Decrease");
        triggerButton(increaseButton, 2);
        triggerButton(decreaseButton, 1);
        expect(wrapper.vm.$store.state.count).toEqual(1);
    });

    // 7. Count text show check
    test("Count text should show", () => {
        const text = wrapper.find("span").text();
        expect(text).toEqual(`${wrapper.vm.$store.state.count}k`);
    });

});

// shallow mounts the Counter component using localVue and store
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
        if (btn.at(i).text() === button) {
            return btn.at(i);
        }
    }
}

// finds the increase/decrease buttons' text
function findButtonText(wrapper, button) {
    let btn = wrapper.findAll("button");
    for (let i = 0; i < btn.length; i++) {
        if (btn.at(i).text() === button) {
            return btn.at(i).text();
        }
    }
}

// triggers the increase/decrease buttons
function triggerButton(button, times) {
    for (let i = 0; i < times; i++) {
        button.trigger("click");
    }
}
