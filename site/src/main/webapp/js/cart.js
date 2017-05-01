$(function(){
    
    $('body').on('click','.addToCartFromModal',function(){
        var $button = $(this),
            $container = $button.closest('.product_container'),
            $form = $button.closest('form'),
            $options = $form.find('.model-input'),
            $errorSpan = $container.find('span.error');
            $productOptionsSpan = $container.find('span.productOptionsSpan');
            
//            if ($container.length == 0) {
//                var myId = $button.parent().attr('id').substring('productOptions'.length);
//                $container = $('.productActions' + myId).closest('.product_container');
//                $form = $container.find('form');
//                $options = $button.parent().find('span.option-value');
//                $errorSpan = $button.parent().find('span.error');
//                $productOptionsSpan = $container.find('span.productOptionsSpan');
//            }
            var itemRequest = BLC.serializeObject($form);
                
            $options.each(function(index, element) {
                var optionType = $(element).data('optiontype');
                var value;

                if ("TEXT" == optionType) {
                        value = $(element).val();
                } else if ("TEXTAREA" == optionType) {
                        value = $(element).val();
                } else if ("DECIMAL" == optionType) {
                        value = $(element).val();
                } else if ("SELECT" == optionType) {
                        value = $(element).val();
                } else if ("COLOR" == optionType) {
                        value = $(element).val();
                } else {
                        value = $(element).val();
                }


                itemRequest['itemAttributes[' + $(element).attr('id') + ']'] = value;
            });
            
            BLC.ajax({url: $form.attr('action'), 
                type: "POST",
                dataType: "json",
                data: itemRequest
            }, function(data, extraData){
                if (data.error) {
                    if (data.error == 'allOptionsRequired') {
                        $errorSpan.css('display', 'block');
                        $errorSpan.effect('highlight', {}, 1000);
                    } else if (data.error == 'productOptionValidationError') {
                            // find the product option that failed validation with jquery
                            // put a message next to that text box with value = data.message
                            $productOptionsSpan.text('Product Validation Failed: '+ data.errorCode+' '+data.errorMessage);
                            $productOptionsSpan.css('display', 'block');
                            $productOptionsSpan.effect('highlight', {}, 1000);

                    } else if (data.error = 'inventoryUnavailable') {
                        $.alert('This item is no longer in stock. We apologize for the inconvenience.', 'Not added');
                    } else {
                        $.alert('Error adding to cart', 'Not added');
                    }
                } else {
                    $errorSpan.css('display', 'none'); 
                    $productOptionsSpan.css('display', 'none'); 
                    updateHeaderCartItemsCount(data.cartItemCount);
                    showInCartButton(data.productId, 'cart');
                    $.alert('Item added into cart successfully', 'Added');
                }
            });
            
        return false;
    });
    
    $(".addToCart").click(function(){
        var $button = $(this),
            $container = $button.closest('.product_container'),
            $form = $button.closest('form'),
            $gridId = $container.find('.grid-id').val();
            $options = $container.find('span.option-value'),
            $errorSpan = $container.find('span.error');
            $productOptionsSpan = $container.find('span.productOptionsSpan');
            
            if ($container.length == 0) {
                var myId = $button.parent().attr('id').substring('productOptions'.length);
                $container = $('.productActions' + myId).closest('.product_container');
                $form = $container.find('form');
                $options = $button.parent().find('span.option-value');
                $errorSpan = $button.parent().find('span.error');
                $productOptionsSpan = $container.find('span.productOptionsSpan');
            }
        
            var itemRequest = BLC.serializeObject($form),
                modalClick = $button.parents('.simplemodal-wrap').length > 0,
                wishlistAdd = $button.hasClass('addToWishlist');
            
            if (itemRequest.hasProductOptions == "true" && !modalClick) {
//                $.modal($('#productOptions' + itemRequest.productId), modalProductOptionsOptions);
                var popUpContent = $('#productOptions' + itemRequest.productId).html();
                popUpContent = popUpContent.replace("matc", "match");
                $.confirm({
                    title: '',
                    content: popUpContent,
                    onContentReady:function(){
                        $('.product-options').removeClass('hidden');
                        $('.product-option-nonjs').remove();
                    },
                    type: 'dark',
                    buttons: {
                        cancel: {
                            text: 'Cancel',
                            btnClass: 'btn'
                        },
                        tryAgain: {
                            text: 'Add to cart',
                            btnClass: 'btn-dark',
                            action: function(){
                                $("#match-"+$gridId).click();
                            }
                        }
                    }
                });
            } else {
                $options.each(function(index, element) {
                    var optionType = $(element).data('optiontype');
                    var value;

                    if ("TEXT" == optionType) {
                            value = $(element).next().find('input').val();
                    } else if ("TEXTAREA" == optionType) {
                            value = $(element).next().find('textarea').val();
                    } else if ("DECIMAL" == optionType) {
                            value = $(element).next().find('input').val();
                    } else if ("SELECT" == optionType) {
                            value = $(element).next().find('select option:checked').val();
                    } else {
                            value = $(element).text();
                    }//need to add other types(date,long, etc) as needed


                    itemRequest['itemAttributes[' + $(element).attr('id') + ']'] = value;
                });
            
                BLC.ajax({url: $form.attr('action'), 
                        type: "POST",
                        dataType: "json",
                        data: itemRequest
                    }, function(data, extraData) {
                        if (data.error) {
                            if (data.error == 'allOptionsRequired') {
                                $errorSpan.css('display', 'block');
                                $errorSpan.effect('highlight', {}, 1000);
                            } else if (data.error == 'productOptionValidationError') {
                                    // find the product option that failed validation with jquery
                                    // put a message next to that text box with value = data.message
                                    $productOptionsSpan.text('Product Validation Failed: '+ data.errorCode+' '+data.errorMessage);
                                    $productOptionsSpan.css('display', 'block');
                                    $productOptionsSpan.effect('highlight', {}, 1000);

                            } else if (data.error = 'inventoryUnavailable') {
                                $.alert('This item is no longer in stock. We apologize for the inconvenience.', 'Not added');
                            } else {
                                $.alert('Error adding to cart', 'Not added');
                            }
                        } else {
                            $errorSpan.css('display', 'none'); 
                            $productOptionsSpan.css('display', 'none'); 
//
//                            if (modalClick) {
//                                $.modal.close();
//                            } else if (wishlistAdd) {
//                                showInCartButton(data.productId, 'wishlist');
//                            } else {
//                                    if(data.skuId != null) {
//                                            showInCartButton(data.skuId, 'cart');
//                                    } else {
//                                    showInCartButton(data.productId, 'cart');
//                                    }
//                            }
//
//                            if (wishlistAdd) {
//                                HC.showNotification(data.productName + "  has been added to your wishlist!");
//                            } else {
//                                HC.showNotification(data.productName + "  has been added to the cart!", 2000);
//                            }
//                            updateHeaderCartItemsCount(data.cartItemCount);
                            updateHeaderCartItemsCount(data.cartItemCount);
                            showInCartButton(data.productId, 'cart');
                            $.alert('Item added into cart successfully', 'Added');
                        }
                    }
                );
            }
        return false;
    });

    // Show the cart in a modal when any link with the class "modalcart" is clicked
    $('body').on('click', 'a.modalcart', function() {
        BLC.ajax({ url: $(this).attr('href') }, function(data) {
            $("#cart-container").html(data);
        });

        return false;
    });

    // Intercept update quantity operations and perform them via AJAX instead
    // This will trigger on any input with class "updateQuantity"
    $('body').on('change', '.quantity-select', function() {
        var $form = $(this).closest('form');
        
        BLC.ajax({url: $form.attr('action'),
                type: "POST", 
                data: $form.serialize() 
            }, function(data, extraData) {
                if (extraData) {
                    updateHeaderCartItemsCount(extraData.cartItemCount);
                    if ($form.children('input.quantityInput').val() == 0) {
                    	if(extraData.skuId != null) {
                        	showAddToCartButton(extraData.skuId, 'cart');
                    	} else {
                    		showAddToCartButton(extraData.productId, 'cart');
                    	}
                    }
                }
                $("#cart-container").html(data);
            }
        );
        return false;
    });
    
    // Intercept remove from cart operations and perform them via AJAX instead
    // This will trigger on any link with class "remove_from_cart"
    $('body').on('click','.remove_from_cart', function(){
        var link = this;
        
        BLC.ajax({url: $(link).attr('href'),
                type: "GET"
            }, function(data, extraData) {
                updateHeaderCartItemsCount(extraData.cartItemCount);
                if(extraData.skuId != null) {
                	showAddToCartButton(extraData.skuId, 'cart');
            	} else {
            		showAddToCartButton(extraData.productId, 'cart');
            	}
                $("#cart-container").html(data);
            }
        );
        return false;
    });
    
    // Bind the JavaScript product option boxes to execute on click
    $('body').on('click', '.product-option-group li:not(.unavailable)', function() {
        HC.changeProductOption($(this));
        return false;
    });
    
    // Hides the add to cart/add to wishlist button and shows the in cart/in wishlist button
    // orderType can either be 'cart' or 'wishlist'
    function showInCartButton(productId, orderType) {
        $('.productActions' + productId).children('.in_'+orderType).removeClass('hidden');
        $('.productActions' + productId).children('.add_to_'+orderType).addClass('hidden');
    }
    
    // Hides the in cart/in wishlist button and shows the add to cart/add to wishlist button
    // orderType can either be 'cart' or 'wishlist'
    function showAddToCartButton(productId, orderType) {
        $('.productActions' + productId).children('.add_to_'+orderType).removeClass('hidden');
        $('.productActions' + productId).children('.in_'+orderType).addClass('hidden');
    }
    
    // This will change the header "X item(s)" text to the new count and pluralization of "item"
    function updateHeaderCartItemsCount(newCount) {
        $("#badge-count").html(newCount);
    }
});