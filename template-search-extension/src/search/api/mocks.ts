import { ApiResult } from '../../types';

export const results: ApiResult = {
    page: 0,
    hasMore: false,
    resultCount: 3,
    results: [
        {
            id: 'ecd6622a-df63-53e6-aae1-3bec033e19e8',
            url: 'http://acme.com/search-sdk',
            title: 'Search SDK is awesome',
            description: 'Description of the capabilities of the Search SDK',
            image: 'https://picsum.photos/50',
            metadata: {
                type: 'Page',
                lastUpdatedDate: '2023-04-01',
                likes: 3,
            },
        },
        {
            id: '1',
            url: 'http://okuge.ml/bazoli',
            title: 'Fake first result',
            description:
                'occasionally teeth thumb former push sentence immediately circle vertical ability sheep energy eye exchange declared baby color carefully chosen serve rope deer slowly silk',
        },
        {
            id: '594a6adc-557a-5049-a344-05904978145d',
            url: 'http://wivek.tp/ubace',
            title: 'Fake content 2',
            description:
                'percent keep glass under since best person that swim affect number middle with unhappy series bit however swimming smell speak stay again aside adult',
        },
        {
            id: '75dd7bab-dea1-500f-a9b0-fe9f6dfdce88',
            url: 'http://soda.la/benew',
            title: 'Fake last result',
            description:
                'everything tune standard figure bet cry hurt equally while grade order shore language tried see garage reason blow boat rule bottom wall ago sat',
        },
    ],
};
