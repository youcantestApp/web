Rails.application.routes.draw do

  root 'index#home'

  #without user


  #with user
  scope '/:user/' do
    get  'schedule/getActives'
    get  'schedule/getArchiveds'
    post 'schedule/archive'
    post 'schedule/delete'
    post 'schedule/active'
    get  'tests/getAll' => 'test#getAll'
    get  'tests/getResults' => 'test#getResults'

    post 'test/insert'
    post 'test/schedule'
    post 'test/executeNow' => 'test#executeNow'
    post 'test/delete'
    get  'test/get/:testId' => 'test#get'

    get  'result/getBySchedule'
    get  'result/getById'
    get  'result/getListByTestId'

    get '/' => 'index#index'
    get '*path' => 'index#index'
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
