import { shallowMount } from '@vue/test-utils';
import sidebar from '@/components/sidebar/sidebar.vue';

describe('Sidebar', () => {
  it('renders with text', () => {
    const wrapper = shallowMount(sidebar)
    expect(wrapper.text()).toMatch('Sidebar')
  })
})
