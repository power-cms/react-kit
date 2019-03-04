![PowerCms](docs/logo-small.png)

# PowerCMS - React kit

[![NPM Version](https://img.shields.io/npm/v/@power-cms/react-kit.svg)](https://www.npmjs.com/package/@power-cms/react-kit)
[![Build Status](https://travis-ci.com/power-cms/react-kit.svg?branch=master)](https://travis-ci.com/power-cms/react-kit)

> React-kit is a wrapper for redux, containing all actions, reducers and **containers**, that you need to build your own front-end for the PowerCMS based website. You don't have to care about api requests, authorization or form validation - just wrap your components with proper react-kit's containers and focus on creating beautiful presentation layer!

## How to install?

```bash
npm install --save @power-cms/react-kit
```

## How to use?

1. Wrap your application with **<Store /\>** component
2. Use **containers** to provide proper data and methods

```tsx
import { settingsContainer, siteContainer, Store } from '@power-cms/react-kit';
import React, { Component } from 'react';
import { Navigation } from './components/Navigation';
import { Sites } from './components/Sites';

const apiUrl = 'http://localhost:3000/api';

export class App extends Component {
  public render() {
    const SitesComponent = siteContainer.getAll(Sites);
    const NavigationComponent = settingsContainer.get(Navigation);

    return (
      <Store reducers={['auth', 'site', 'form', 'settings']} apiUrl={apiUrl}>
        <NavigationComponent />
        <SitesComponent />
      </Store>
    );
  }
}
```

## Documentation

### Sites

```tsx
import { siteContainer } from '@power-cms/react-kit';
```

**Available methods:**

\[[getAll](#getall), [create](#create), [update](#update)\]

### Users

```tsx
import { userContainer } from '@power-cms/react-kit';
```

**Available methods:**

\[[getAll](#getall), [update](#update)\]

### Settings

```tsx
import { settingsContainer } from '@power-cms/react-kit';
```

**Available methods:**

\[[get](#get), [update](#update)\]

## Actions description

### getAll

_Responsible for fetching all collection data. Includes also pagination payload and delete method._

Received props:\
**data** - data collection array\
**isLoading** - data loading flag\
**pagination** - pagination data\
**getData(page)** - fetch data method - needs to be run when _componentDidMount_\
**delete(siteId)** - delete method

### get

_Responsible for fetching single resource._

Received props:\
**data** - single resource instance\
**isLoading** - data loading flag\
**getData()** - fetch data method - needs to be run when _componentDidMount_

### create

_Responsible for creating new resource._

Receives all necessary props to use redux-form

### update

_Responsible for updating a single resource. Includes also delete method._

Receives all necessary props to use redux-form and:\
**getData(page)** - fetch data method - needs to be run when _componentDidMount_\
**delete(siteId)** - delete method

## License

Copyright &copy; 2019 by Szymon Piecuch under ISC license.
