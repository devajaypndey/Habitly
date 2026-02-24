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
    ├── ui
│
├── pages/                    # Route-level screens
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
│   └── TaskHeatmapPage.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│   ├── localStorage.js       # get/set/remove helpers
│
│
├── App.jsx
├── main.jsx
└── index.css
```