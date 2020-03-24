<?php

namespace HRis\UI\Providers;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class UIServiceProvider extends BaseServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__.'/../../assets/views', 'ui');
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register(): void
    {
        // TODO: Implement register() method.
    }
}
