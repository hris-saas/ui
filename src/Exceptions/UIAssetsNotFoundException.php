<?php

namespace HRis\UI\Exceptions;

use Facade\IgnitionContracts\Solution;
use Facade\IgnitionContracts\ProvidesSolution;
use HRis\UI\Solutions\UIAssetsNotFoundSolution;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class UIAssetsNotFoundException extends FileNotFoundException implements ProvidesSolution
{
    public function getSolution(): Solution
    {
        return new UIAssetsNotFoundSolution();
    }
}
