<?php

namespace HRis\UI\Solutions;

use Illuminate\Support\Facades\Artisan;
use Facade\IgnitionContracts\RunnableSolution;

class UIAssetsNotFoundSolution implements RunnableSolution
{
    public function getSolutionTitle(): string
    {
        return 'HRis SaaS UI assets are missing';
    }

    public function getSolutionDescription(): string
    {
        return 'Publish the HRis SaaS UI assets using `php artisan vendor:publish --tag=hris-saas::ui`.';
    }

    public function getDocumentationLinks(): array
    {
        return ['README.md' => 'https://gitlab.com/hris-saas/app#publishing-ui'];
    }

    public function getSolutionActionDescription(): string
    {
        return '';
    }

    public function getRunButtonText(): string
    {
        return 'Publish HRis SaaS UI assets';
    }

    public function run(array $parameters = [])
    {
        Artisan::call('vendor:publish', $parameters);
    }

    public function getRunParameters(): array
    {
        return ['--tag' => 'hris-saas::ui'];
    }
}
