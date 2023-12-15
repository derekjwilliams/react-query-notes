# Running

This is a super simple application. Both the mock server and client need to be run

## Mock Server

The json-server package is used to mock a server:

```npm run server```

The server runs on port 3001, so to see users, use http://localhost:3001/users

## Postgrest Server

Modify `requests.js` to point to a local Postgrest instance

## Client

```npm run dev```

The client runs on port 5173, navigate to http://localhost:5173 to see the super simple client

## Example queries against a Postgrest Server

### Users with Audiences

```
http://localhost:3000/users?select=display_name,family_name,email,employee_id,given_name,audiences(display_name,active,visible)
```

### Users with Sites

http://localhost:3000/users?select=display_name,family_name,sites(display_name)

### Users with Classifications

http://localhost:3000/users?select=display_name,family_name,classifications(display_name,short_name,active)

### Classifications with resource_links

http://localhost:3000/classifications?select=display_name,short_name,active,resource_links(type,destination_url)

# mymymy Components from Pages/index.jsx

```JavaScript
import Link from '@/Components/Link';
import LinkPopup from '@/Components/LinkPopup';
import PopularLinks from '@/Components/PopularLinks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardTodayAnnouncements from '@/Components/DashboardTodayAnnouncements';
import DashboardTodaySavethedate from '@/Components/DashboardTodaySavethedate';
import DashboardTodayNewEmployees from '@/Components/DashboardTodayNewEmployees';
import DashboardTodayJobPosting from '@/Components/DashboardTodayJobPosting';
import DashboardAthletics from '@/Components/DashboardAthletics';
import AudienceClassifications from '@/Components/AudienceClassifications';
import DashboardEvents from '@/Components/DashboardEvents';
import AcademicFeed from '@/Components/AcademicFeed';
import LogoToday from '@/Components/LogoToday';
import PrimaryButton from '@/Components/PrimaryButton';
import TopNavLinks from '@/Components/TopNavLinks';
import FormCheckbox from '@/Components/FormCheckbox';
import HighlightCarousel from '@/Components/HighlightCarousel';
import HelpVideo from '@/Components/HelpVideo';
import { UserACContext } from '@/Contexts/UserACContext';
```

### Resource Link Favorites

Populated in app/Http/Controllers/HomeController.php

```php
// Render our view
return Inertia::render('Index', [
    'resourceLinkFavorites' => $user->getFavoriteItems(ResourceLink::class)->get(),
    'siteFavorites' => $sites,
    'permissions' => $permissions,
    'roles' => $roles,
]);
```

getFavoriteItems in app/Traits/Favoriter.php

```php
return app($model)->whereHas(
    'favoriters',
    fn ($q) => $q->where('user_id', $this->getKey())
);
```

### DashboardEvents


```JavaScript
<DashboardEvents
    apiUrl="https://events.willamette.edu/api/v1/mywu_events"
    eventType="today"
/>
```

```JavaScript
axios
    .get(apiUrl)
    .then((response) => {
        const feed = response.data;
        setDashboardEvents(feed.haps);
    })
    .catch((error) => {
        console.log(error);
    });
```

Note: the url returns populated data

### DashboardTodayAnnouncements

```JavaScript
 apiUrl="https://d1kbbzapgpdk13.cloudfront.net/json_data/today_announcements.json"
```

```JavaScript
axios
    .get(apiUrl)
    .then((response) => {
        setAnnouncements(response.data.announcements || []);
    })
    .catch((error) => {
        console.log(error);
    });
```

Note: the url returns populated data

### DashboardTodaySavethedate, Save the date

```JavaScript
<DashboardTodaySavethedate apiUrl="https://d1kbbzapgpdk13.cloudfront.net/json_data/today_save_the_dates.json" />
```

Note: fetchPostings is a bit confusing below

```JavaScript
const fetchPostings = async () => {
    axios
        .get(apiUrl)
        .then((response) => {
            setSaveTheDates(response.data.saveTheDates || []);
        })
        .catch((error) => {
            console.log(error);
        });
};
```

Note: the url returns empty data

### DashboardTodayNewEmployees, New Employees

```JavaScript
<DashboardTodayNewEmployees apiUrl="https://d1kbbzapgpdk13.cloudfront.net/json_data/today_new_employees.json" />
```

```JavaScript
const fetchNewEmployees = async () => {
    axios
        .get(apiUrl)
        .then((response) => {
            setNewEmployees(response.data.newEmployees || []);
        })
        .catch((error) => {
            console.log(error);
        });
};
```

Note: the url returns empty data

### DashboardTodayJobPosting, Job Postings

```JavaScript
<DashboardTodayJobPosting apiUrl="https://d1kbbzapgpdk13.cloudfront.net/json_data/today_job_postings.json" />
```

```JavaScript
    axios
        .get(apiUrl)
        .then((response) => {
            setDateRange(response.data.jobPostingDateRange || '');
            setFacultyPostings(response.data.facultyJobPostings || []);
            setStaffPostings(response.data.staffJobPostings || []);
        })
        .catch((error) => {
            console.log(error);
        });
```

Note: the url returns live data

### PopularLinks

```JavaScript
axios
    .get('/getpopularlinks', {
        params: {
            classifications: userAC.classifications,
            audiences: userAC.audiences,
        },
    })
```
