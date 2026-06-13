# Architectural Decisions

For state management, I chose React Context API because the application only has one main global state: the shopping cart. Context API keeps the solution simple, avoids prop drilling, and removes the need for additional libraries.

Another decision was storing the selected color and size in the URL query parameters. This makes product variants deep-linkable, so users can refresh, bookmark, or share a specific product variant without losing their selection.

## What I Would Improve With More Time

If I had more time, I would use a richer product API that provides multiple images, brand information, and real inventory data. The Fake Store API is limited, so some values such as stock status had to be simulated.

I would also improve the overall UI and accessibility with better loading states, notifications, and keyboard navigation support.
