define(function(require, exports, module) {

	exports.showSideBar=()=>{

		const dhs = document.getElementById("dhs-id");
		const html=`<div class="dsh-minimal-aside--inner">
									<!-- Dashboard -->
									<div class="minimal-aside-section active" id="minimalDashboard">
										<ul>
											<li class="menu-item-section">Dashboard</li>
											<li> <a href="dashboard/dashboard-analytics.html"> <span><i class="mr-3 fs-16 lni-bar-chart"></i> Analytics</span> </a> </li>
											<li> <a href="dashboard/dashboard-ecommerce.html"> <span><i class="mr-3 fs-16 lni-shopping-basket"></i> Ecommerce</span> </a> </li>
											<li> <a href="dashboard/dashboard-support.html"> <span><i class="mr-3 fs-16 lni-support"></i> Support</span> </a> </li>
											<li> <a href="dashboard/dashboard-crypto.html"> <span><i class="mr-3 fs-16 lni-bitcoin"></i> Cryptocurrency</span> </a> </li>
										</ul>
									</div>
									<!-- /Dashboard -->

									<!-- Pages -->
									<div class="minimal-aside-section" id="minimalPages">
										<ul>
											<li class="menu-item-section">Pages</li>
											<li> <a href="pages/contact-list.html"> <span><i class="mr-3 fs-16 lni-users"></i> Contact List</span> </a> </li>
											<li> <a href="pages/faq.html"> <span><i class="mr-3 fs-16 lni-question-circle"></i> FAQ</span> </a> </li>
											<li> <a href="pages/pricing-tables.html"> <span><i class="mr-3 fs-16 lni-money-location"></i> Pricing Tables</span> </a> </li>
											<li> <a href="pages/invoice.html"> <span><i class="mr-3 fs-16 lni-empty-file"></i> Invoice</span> </a> </li>
											<li> <a href="pages/coming-soon.html"><span><i class="mr-3 fs-16 lni-lock"></i> Coming Soon</span></a> </li>
											<li> <a href="pages/error-404.html"><span><i class="mr-3 fs-16 lni-cross-circle"></i>Error 404</span></a> </li>
											<li> <a href="pages/error-500.html"><span><i class="mr-3 fs-16 lni-cross-circle"></i>Error 500</span></a> </li>
										</ul>
									</div>
									<!-- /Pages -->

									<!-- Auth -->
									<div class="minimal-aside-section" id="minimalAuth">
										<ul>
											<li class="menu-item-section">Authentication</li>
											<li> <a href="auth/login.html"> <span><i class="mr-3 fs-16 lni-shield"></i> Log in</span> </a> </li>
											<li> <a href="auth/register.html"> <span><i class="mr-3 fs-16 lni-shield"></i> Register</span> </a> </li>
											<li> <a href="auth/forgot-password.html"> <span><i class="mr-3 fs-16 lni-shield"></i> Forgot Password</span> </a> </li>
											<li> <a href="auth/lock-screen.html"> <span><i class="mr-3 fs-16 lni-shield"></i> Lock Screen</span> </a> </li>
										</ul>
									</div>
									<!-- /Auth -->

									<!-- Apps -->
									<div class="accordion minimal-aside-section" id="minimalApps">
										<ul>
											<li class="menu-item-section">Apps</li>
											<li>
												<a href="#" data-toggle="collapse" data-target="#user-management" aria-expanded="false" aria-controls="user-management">
													<span>
														<i class="mr-3 fs-16 lni-user"></i>
														User Management
														<i class="lni-chevron-right ml-auto"></i>
													</span>
												</a>
												<ul id="user-management" class="collapse" aria-labelledby="user-management" data-parent="#minimalApps">
													<li> <a href="apps/user-profile.html"> <span> User Profile</span> </a> </li>
													<li> <a href="apps/user-list.html"> <span> User List</span> </a> </li>
												</ul>
											</li>
											<li>
												<a href="#" data-toggle="collapse" data-target="#ecommerce" aria-expanded="false" aria-controls="ecommerce">
													<span>
														<i class="mr-3 fs-16 lni-shopping-basket"></i>
														Ecommerce
														<i class="lni-chevron-right ml-auto"></i>
													</span>
												</a>
												<ul id="ecommerce" class="collapse" aria-labelledby="ecommerce" data-parent="#minimalApps">
													<li> <a href="apps/product-list.html"> <span>Product List</span> </a> </li>
													<li> <a href="apps/products.html"> <span>Products</span> </a> </li>
													<li> <a href="apps/product-details.html"> <span>Product Details</span> </a> </li>
													<li> <a href="apps/cart.html"> <span>Cart</span> </a> </li>
													<li> <a href="apps/checkout.html"> <span>Checkout</span> </a> </li>
													<li> <a href="apps/product-add.html"> <span>Add Product</span> </a> </li>
												</ul>
											</li>
											<li> <a href="apps/calendar.html"> <span><i class="mr-3 fs-16 lni-calendar"></i> Calendar</span> </a> </li>
											<li> <a href="apps/inbox.html"> <span><i class="mr-3 fs-16 lni-inbox"></i> Inbox</span> </a> </li>
											<li> <a href="apps/file-manager.html"> <span><i class="mr-3 fs-16 lni-files"></i> File Manager</span> </a> </li>
											<li> <a href="apps/task-manager.html"> <span><i class="mr-3 fs-16 lni-list"></i> Task Manager</span> </a> </li>
										</ul>
									</div>
									<!-- /Apps -->

									<!-- Basic UI -->
									<div class="minimal-aside-section" id="minimalBasicUi">
										<ul>
											<li class="menu-item-section">Basic UI Kit</li>
											<li> <a href="basic-ui-kit/buttons.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Buttons</span> </a> </li>
											<li> <a href="basic-ui-kit/badges.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Badges</span> </a> </li>
											<li> <a href="basic-ui-kit/accordions.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Accordions</span> </a> </li>
											<li> <a href="basic-ui-kit/alerts.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Alerts</span> </a> </li>
											<li> <a href="basic-ui-kit/pagination.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Pagination</span> </a> </li>
											<li> <a href="basic-ui-kit/cards.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Cards</span> </a> </li>
											<li> <a href="basic-ui-kit/tabs.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Tabs</span> </a> </li>
											<li> <a href="basic-ui-kit/loaders.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Loaders</span> </a> </li>
											<li> <a href="basic-ui-kit/progress-bars.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Progress Bars</span> </a> </li>
											<li> <a href="basic-ui-kit/timeline.html"> <span><i class="mr-3 fs-16 lni-grid-alt"></i> Timeline</span> </a> </li>
										</ul>
									</div>
									<!-- /Basic UI -->

									<!-- Advanced UI -->
									<div class="minimal-aside-section" id="minimalAdvancedUi">
										<ul>
											<li class="menu-item-section">Advanced UI Kit</li>
											<li> <a href="advanced-ui-kit/dragula.html"> <span><i class="mr-3 fs-16 lni-code"></i> Dragula</span> </a> </li>
											<li> <a href="advanced-ui-kit/carousel-sliders.html"> <span><i class="mr-3 fs-16 lni-code"></i> Carousel Sliders</span> </a> </li>
											<li> <a href="advanced-ui-kit/modals.html"> <span><i class="mr-3 fs-16 lni-code"></i> Modals</span> </a> </li>
											<li> <a href="advanced-ui-kit/rating.html"> <span><i class="mr-3 fs-16 lni-code"></i> Rating</span> </a> </li>
											<li> <a href="advanced-ui-kit/tour.html"> <span><i class="mr-3 fs-16 lni-code"></i> Tour</span> </a> </li>
											<li> <a href="advanced-ui-kit/nested-lists.html"> <span><i class="mr-3 fs-16 lni-code"></i> Nested Lists</span> </a> </li>
											<li> <a href="advanced-ui-kit/tree-view.html"> <span><i class="mr-3 fs-16 lni-code"></i> Tree View</span> </a> </li>
											<li> <a href="advanced-ui-kit/block-ui.html"> <span><i class="mr-3 fs-16 lni-code"></i> Block UI</span> </a> </li>
										</ul>
									</div>
									<!-- /Advanced UI -->

									<!-- Widgets -->
									<div class="minimal-aside-section" id="minimalWidgets">
										<ul>
											<li class="menu-item-section">Widgets</li>
											<li> <a href="widgets.html"> <span><i class="mr-3 fs-16 lni-layers"></i> Layout Widgets</span> </a> </li>
											<li> <a href="statistical-widgets.html"> <span><i class="mr-3 fs-16 lni-layers"></i> Statistical Widgets</span> </a> </li>
										</ul>
									</div>
									<!-- /Widgets -->

									<!-- Charts -->
									<div class="minimal-aside-section" id="minimalCharts">
										<ul>
											<li class="menu-item-section">Charts</li>
											<li> <a href="charts/apex.html"> <span><i class="mr-3 fs-16 lni-pie-chart"></i>Apex</span> </a> </li>
											<li> <a href="charts/morris.html"> <span><i class="mr-3 fs-16 lni-pie-chart"></i>Morris</span> </a> </li>
											<li> <a href="charts/chartjs.html"> <span><i class="mr-3 fs-16 lni-pie-chart"></i>Chartjs</span> </a> </li>
										</ul>
									</div>
									<!-- /Charts -->

									<!-- Popups -->
									<div class="minimal-aside-section" id="minimalPopups">
										<ul>
											<li class="menu-item-section">Popups</li>
											<li> <a href="popups/tooltips.html"><span><i class="mr-3 fs-16 lni-popup"></i> Tooltips</span> </a> </li>
											<li> <a href="popups/popovers.html"><span><i class="mr-3 fs-16 lni-popup"></i> Pop-overs</span> </a> </li>
											<li> <a href="popups/sweet-alerts.html"><span><i class="mr-3 fs-16 lni-popup"></i> Sweet Alerts</span> </a> </li>
											<li> <a href="popups/toasts.html"><span><i class="mr-3 fs-16 lni-popup"></i> Toasts</span> </a> </li>
										</ul>
									</div>
									<!-- /Icons -->

									<!-- Icons -->
									<div class="minimal-aside-section" id="minimalIcons">
										<ul>
											<li class="menu-item-section">Icons</li>
											<li> <a href="icons/fontawesome.html"> <span><i class="mr-3 fs-16 lni-bi-cycle"></i> Fontawesome</span> </a> </li>
											<li> <a href="icons/svg-icons.html"> <span><i class="mr-3 fs-16 lni-basketball"></i> SVG Icons</span> </a> </li>
											<li> <a href="icons/lineicons.html"> <span><i class="mr-3 fs-16 lni-lineicons"></i> Line Icons</span> </a> </li>
										</ul>
									</div>
									<!-- /Icons -->

									<!-- Maps -->
									<div class="minimal-aside-section" id="minimalMaps">
										<ul>
											<li class="menu-item-section">Maps</li>
											<li> <a href="maps/vector-maps.html"> <span><i class="mr-3 fs-16 lni-map-marker"></i> Vector Maps</span> </a> </li>
										</ul>
									</div>
									<!-- /Maps -->

									<!-- Forms -->
									<div class="minimal-aside-section" id="minimalForms">
										<ul>
											<li class="menu-item-section">Form Elements</li>
											<li> <a href="form-elements/basic-form-controls.html"> <span><i class="mr-3 fs-16 lni-indent-decrease"></i> Basic Form Controls</span> </a> </li>
											<li> <a href="form-elements/advanced-form-controls.html"> <span><i class="mr-3 fs-16 lni-indent-increase"></i> Advanced Form Controls</span> </a> </li>
											<li> <a href="form-elements/form-validation.html"> <span><i class="mr-3 fs-16 lni-check-mark-circle"></i> Form Validation</span> </a> </li>
											<li> <a href="form-elements/form-editors.html"> <span><i class="mr-3 fs-16 lni-line-spacing"></i> Form Editors</span> </a> </li>
											<li> <a href="form-elements/file-upload.html"> <span><i class="mr-3 fs-16 lni-cloud-upload"></i> File Upload</span> </a> </li>
										</ul>
									</div>
									<!-- /Forms -->

									<!-- Tables -->
									<div class="minimal-aside-section" id="minimalTables">
										<ul>
											<li class="menu-item-section">Tables</li>
											<li> <a href="tables/basic-tables.html"> <span><i class="mr-3 fs-16 lni-database"></i> Basic Tables</span> </a> </li>
											<li class="accordion" id="minimalDatatables">
												<a href="#" data-toggle="collapse" data-target="#data-tables" aria-expanded="false" aria-controls="data-tables">
													<span>
														<i class="mr-3 fs-16 lni-database"></i>
														Data tables
														<i class="lni-chevron-right ml-auto"></i>
													</span>
												</a>
												<ul id="data-tables" class="collapse" aria-labelledby="data-tables" data-parent="#minimalDatatables">
													<li> <a href="tables/datatables.html"> <span>Basic Data Tables</span> </a> </li>
													<li> <a href="tables/datatables-ext-buttons.html"> <span>Ext: Buttons</span> </a> </li>
													<li> <a href="tables/datatables-ext-colreorder.html"> <span>Ext: Column Reorder</span> </a> </li>
													<li> <a href="tables/datatables-ext-responsive.html"> <span>Ext: Responsive</span> </a> </li>
													<li> <a href="tables/datatables-ext-rowgroup.html"> <span>Ext: Row Group</span> </a> </li>
													<li> <a href="tables/datatables-ext-rowreorder.html"> <span>Ext: Row Reorder</span> </a> </li>
												</ul>
											</li>
										</ul>
									</div>
									<!-- /Tables -->

									<!-- Layouts -->
									<div class="minimal-aside-section" id="minimalLayouts">
										<ul>
											<li class="menu-item-section">Boilerplate Layouts</li>
											<li> <a href="boilerplate-layouts/layout-minimal-sidebar.html"> <span><i class="mr-3 fs-16 lni-layout"></i> Minimal Sidebar</span> </a> </li>
											<li> <a href="boilerplate-layouts/layout-left-sidebar.html"> <span><i class="mr-3 fs-16 lni-layout"></i> Left Sidebar</span> </a> </li>
											<li> <a href="boilerplate-layouts/layout-no-sidebar.html"> <span><i class="mr-3 fs-16 lni-layout"></i> No Sidebar</span> </a> </li>
										</ul>
									</div>
									<!-- /Layouts -->

								</div>`

			 	dhs.insertAdjacentHTML('beforeEnd', html);
		 }
	


	});