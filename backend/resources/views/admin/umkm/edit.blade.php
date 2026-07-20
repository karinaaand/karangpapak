@extends('layouts.admin')

@section('content')
    @include('admin.partials.errors')
    <div class="rounded-[1.75rem] bg-white p-8 shadow-sm">
        <h2 class="text-3xl font-semibold text-slate-900">Edit UMKM</h2>
        @include('admin.umkm.form', ['action' => route('admin.umkm.update', $umkm), 'method' => 'PUT'])
    </div>
@endsection