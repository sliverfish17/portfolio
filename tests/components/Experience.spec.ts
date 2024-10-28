import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ExperienceComponent from '~/components/ui/Experience.vue';
import Loader from '~/components/ui/Loader.vue';
import { useContentful } from '~/composables/useContentful';
import { ref } from 'vue';

vi.mock('~/composables/useContentful');

const mockedUseContentful = useContentful as jest.MockedFunction<typeof useContentful>;

const mockExperienceData = [
  {
    fields: {
      name: 'Company A',
      date: '2022',
      description: 'Worked on amazing projects.',
      id: '1',
    },
  },
];

describe('ExperienceComponent', () => {
  it('renders the loader when loading', () => {
    mockedUseContentful.mockReturnValue({
      data: ref(null),
      loading: ref(true),
      error: ref(null),
      fetchData: vi.fn(),
      skip: ref(0),
      totalEntries: ref(0),
    });

    const wrapper = mount(ExperienceComponent);
    expect(wrapper.findComponent(Loader).exists()).toBe(true);
  });

  it('renders error message when there is an error', () => {
    mockedUseContentful.mockReturnValue({
      data: ref(null),
      loading: ref(false),
      error: ref('Failed to load data'),
      fetchData: vi.fn(),
      skip: ref(0),
      totalEntries: ref(0),
    });

    const wrapper = mount(ExperienceComponent);
    expect(wrapper.text()).toContain('Failed to load data');
  });

  it('renders experience data correctly', () => {
    mockedUseContentful.mockReturnValue({
      data: ref(mockExperienceData),
      loading: ref(false),
      error: ref(null),
      fetchData: vi.fn(),
      skip: ref(4),
      totalEntries: ref(10),
    });

    const wrapper = mount(ExperienceComponent);
    expect(wrapper.find('h2').text()).toBe('Experience');
    expect(wrapper.findAll('h3').length).toBe(1);
    expect(wrapper.find('h3').text()).toContain('Frontend Developer at Company A');
    expect(wrapper.findAll('p').at(1)?.text()).toContain('Worked on amazing projects.');
  });

  it('calls fetchData on mount', () => {
    const fetchDataMock = vi.fn();
    mockedUseContentful.mockReturnValue({
      data: ref(null),
      loading: ref(true),
      error: ref(null),
      fetchData: fetchDataMock,
      skip: ref(0),
      totalEntries: ref(0),
    });

    mount(ExperienceComponent);
    expect(fetchDataMock).toHaveBeenCalled();
  });
});
