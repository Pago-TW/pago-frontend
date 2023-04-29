# Pago Frontend

Repository for the frontend of the Pago project.

- [Pago Frontend](#pago-frontend)
  - [Todo](#todo)


## Todo

- [x] Multi images
  - [x] Display in `/orders/\[id\]` page
  - [x] Update `/orders/new` form to allow multi img upload
- [ ] `/orders/\[id\]` feature
  - [x] Order deleting
  - [ ] Order editing
  - [x] Status color
  - [x] (Action) buttons at the bottom of the page
    - [ ] Test if the buttons work
- [ ] `/trips/\[id\]` feature
  - [ ] Trip deleting
  - [ ] Trip editing
  - [x] (Action) buttons at the bottom of the page
    - [ ] Test if the buttons work
- [ ] Remove `error` and `helperText` props from all the components that used
     `useController` and use `field.error` instead
- [ ] Turn multi steps form into wizard form
- [x] Infinite query for trips
- [x] Infinite query for bids
- [ ] Generic mutation hook to invalidate queries (maybe?)
- [x] Check if there's return value when deleting a order (for `useDeleteOrder` hook)  
      :arrow_right: checked, no ret val
- [x] Universal modal for canceling/postponing order by generic (idk if it's possible)  
      :arrow_right: I did it although it's ugly
- [x] Change mutate functions' arguments to object (maybe)  
      :arrow_right: only optional params in object, required params still in args
- [ ] Make a `DetailList` component and render details according to the object passed in (maybe)
- [ ] Show the chosen currency in [`NeedsForm`](/src/components/forms/NeedsForm.tsx) with selection disabled
