# California, here we come

On Windows, double-click `start-server.bat`, then open http://localhost:8000/ in your browser. Python 3 is required. Press Ctrl+C in the server window to stop it.

A static, mobile-friendly itinerary map for a proposed April 25–May 10, 2027 trip. For local preview, run `python -m http.server 8000` in this folder and open http://localhost:8000/ in your browser. Alternatively, publish the repository with GitHub Pages (deploy from the root of the default branch). Do not open `index.html` directly as a `file://` URL: OpenStreetMap may block map tiles because the browser does not send a website referrer. No build step or API key is needed. The map tiles, Leaflet and fonts load from external services, so an internet connection is required.

Edit the `stops` and `legs` arrays in `app.js` to change dates, overnight counts, descriptions, coordinates and estimated travel times. Route lines are schematic straight lines, not navigation or actual road geometry; travel times are rough one-way estimates without stops, not measurements of the lines. Verify routes, closures, transit schedules and opening hours before booking.

The draft assumes 2027 and identifies Bishop and Angels Camp as provisional hotel towns. The preferred route from Tahoe to Calaveras Big Trees follows CA-4 via Bear Valley, but Ebbetts Pass may be closed in spring. The backup is US 50 over Echo Summit to Placerville, CA-49 south via Jackson and Angels Camp, and CA-4 east through Arnold to the park, returning to Angels Camp afterward. Check road and weather conditions: US 50 can also close or require chains. The Highway 1 coastal route can also be subject to closures. Check tour schedules and weather before booking the Monterey Bay whale-watching trip.


## Fast-food stops

`food.js` contains one suggested branch per chain near the trip's stops, with official source links, addresses, approximate marker coordinates, suggested food, and route context. The selection includes the travelers' requested chains as exceptions to the original Germany filter, plus the earlier suggestions. Branches were checked in November 2026; recheck before the 2027 trip. Food markers are available in both map views, with a visibility toggle and an expandable list. Directions use the branch name and street address.

## Cache updates

Chain icons are stored locally in `assets/chains/` and used in both the map markers and restaurant list. Their source references are in `assets/chains/SOURCES.md`.

Map logos have a white background, a dark border, and a white halo above the route labels. Nearby restaurants combine into a numbered group to avoid overlapping icons at any zoom level; clicking a group zooms in to its branches. Selecting a restaurant in the list opens its individual marker at street level.

When changing `app.js`, `food.js`, or `style.css`, increment the corresponding `?v=` value in `index.html` before publishing. The browser must receive the updated HTML before it can discover the new asset URLs.
