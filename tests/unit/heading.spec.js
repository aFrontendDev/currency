import { shallowMount } from '@vue/test-utils';
import heading from '@/components/heading/heading.vue';

describe('Heading', () => {
  it('renders with the passed title prop', () => {
    const title = 'Title Text'
    const wrapper = shallowMount(heading, {
      propsData: { title }
    })
    expect(wrapper.text()).toMatch('Title Text')
  })
})
