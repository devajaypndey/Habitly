# Gridly
![](src/images/banner.png)


```
src/
│
├── app/
│   ├── store.js              # Redux store
│   ├── rootReducer.js        # combineReducers
│   └── hooks.js              # typed redux hooks
│
├── features/                 # Redux slices (core logic)
│   ├── auth/
│   │   └── authSlice.js      # login/logout using localStorage
│   │
│   ├── tasks/
│   │   └── taskSlice.js      # app data (mock)
│   │
│   └── ui/
│       └── uiSlice.js        # theme, modal, loader etc.
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   │
│   └── layout/
│       ├── Header.jsx
│       └── Sidebar.jsx
│
├── pages/                    # Route-level screens
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│   ├── localStorage.js       # get/set/remove helpers
│   └── mockData.js           # fake data (Phase-1 only)
│
├── styles/
│   └── global.css
│
├── App.jsx
├── main.jsx
└── index.css
```

```login code :
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";

const dispatch = useAppDispatch();

const handleLogin = () => {
  const fakeUser = {
    id: Date.now(),
    name: "Ajay",
    email: "ajay@example.com",
  };

  dispatch(login(fakeUser));
};
```