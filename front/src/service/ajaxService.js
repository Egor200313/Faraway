export function ajaxService(url, params = {}) {
  return fetch('http://localhost:5000' + url, params).then((data) => {
    return data.json();
  });
}

export function ajaxAuthService(url, params = {}) {
  return fetch(`${process.env.REACT_APP_API}` + url, params).then(
    (data) => {
      if (data.ok) {
        return data.json();
      }
      throw Error();
    }
  );
}

export function ajaxMainService(url, params = {}) {
  let accessToken = window.localStorage.getItem('ACCESS');
  let newParams = params;
  if (accessToken) {
    newParams = {
      ...params,
      headers: { ...params.headers, Authorization: `Bearer ${accessToken}` },
    };
  }
  return fetch(`${process.env.REACT_APP_API}` + url, newParams).then(
    (data) => {
      if (data.status === 401 && window.localStorage.getItem('REFRESH')) {
        ajaxAuthService('/refresh', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            refresh: window.localStorage.getItem('REFRESH'),
          }),
        }).then((data) => {
          if (data.status === 401) {
            // refresh expired
            window.localStorage.clear();
            return;
          }
          window.localStorage.setItem('ACCESS', data.access);
          newParams = {
            ...params,
            headers: {
              ...params.headers,
              Authorization: `Bearer ${data.access}`,
            },
          };

          fetch(`${process.env.REACT_APP_API}` + url, newParams).then(
            (data) => {
              if (data.ok) {
                return data.json();
              }

              throw Error();
            }
          );
        });
      }
      if (data.ok) {
        return data.json();
      }
      throw Error();
    }
  );
}

export function ajaxSimpleService(url, params = {}) {
  let accessToken = window.localStorage.getItem('ACCESS');
  let newParams = params;
  if (accessToken) {
    newParams = {
      ...params,
      headers: { ...params.headers, Authorization: `${accessToken}` },
    };
  }
  return fetch(`${process.env.REACT_APP_API}` + url, newParams).then(
    (data) => {
      if (data.ok) {
        return data.json();
      }
      throw Error();
    }
  );
}
