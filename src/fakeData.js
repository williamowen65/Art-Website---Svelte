/**
 * This is essentially the modal.
 * Values used here are fallback values. Defaults.
 * When being used, they may also pass along instructions to the user on how to start using this section
 */

export const fakeData = {
    textContent: {
        commissions: `
## Commissions
    \n- test
    \n- test2
        `,
        newsletterTitle: "Sign Up for Newsletters (editable)",
        banner: {
            url: "https://placehold.co/602x401?text=Placeholder+Image",
            description: "TESTING"
        }
    },

    collections: {
        originals: {
            1: {
                imgUrl: "https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts=",
                collectionType: "Type 1",
                description: "Lorem ipsum dolor sit amet."
            },
            2: {
                imgUrl: "https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8=",
                collectionType: "Type 2",
                description: "Lorem ipsum dolor sit amet."
            },
        },
        reproductions: {
            1: {
                imgUrl: "https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg=",
                collectionType: "Type 1",
                description: "Lorem ipsum dolor sit amet."
            },

        },
    },
    classes: {
        1: {
            className: "My First Class",
            description: "This is my favorite class. You will enjoy it.",
            dates: {
                1: 'some date string time',
                2: 'some date string time',
            },
            cost: "200",
            images: {
                1: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                2: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                3: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                4: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
            }
        },
        2: {
            className: "My Other Class",
            description: "This is my favorite class. You will enjoy it.",
            dates: {
                1: 'some date string time',
                2: 'some date string time',
            },
            cost: "200",
            images: {
                1: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                2: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                3: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
                4: {
                    imgUrl: "https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
                },
            }
        },
    }
}