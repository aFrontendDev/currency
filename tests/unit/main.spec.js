import { shallowMount } from '@vue/test-utils';
import main from '@/components/main/main.vue';

describe('Main', () => {
  it('renders with text', () => {
    const wrapper = shallowMount(main)
    expect(wrapper.text()).toMatch('Main')
  })
})
