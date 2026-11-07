# California, here we come

A static, mobile-friendly itinerary map for a proposed April 25–May 10, 2027 trip. For local preview, run `python -m http.server 8000` in this folder and open http://localhost:8000/ in your browser. Alternatively, publish the repository with GitHub Pages (deploy from the root of the default branch). Do not open `index.html` directly as a `file://` URL: OpenStreetMap may block map tiles because the browser does not send a website referrer. No build step or API key is needed. The map tiles, Leaflet and fonts load from external services, so an internet connection is required.

Edit the `stops` and `legs` arrays in `app.js` to change dates, overnight counts, descriptions, coordinates and estimated distances. Route lines are schematic straight lines, not navigation or actual road geometry; distances are rough planning estimates, not measurements of the lines. Verify routes, closures, transit schedules and opening hours before booking.

The draft assumes 2027 and identifies Bishop and Angels Camp as provisional hotel towns. The preferred route from Tahoe to Calaveras Big Trees follows CA-4 via Bear Valley, but Ebbetts Pass may be closed in spring. The backup is US 50 over Echo Summit to Placerville, CA-49 south via Jackson and Angels Camp, and CA-4 east through Arnold to the park, returning to Angels Camp afterward. Check road and weather conditions: US 50 can also close or require chains. The Highway 1 coastal route can also be subject to closures. Check tour schedules and weather before booking the Monterey Bay whale-watching trip.

