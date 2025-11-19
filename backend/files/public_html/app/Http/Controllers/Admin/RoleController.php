<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\RoleHasPermission;
use DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        if(!auth()->user()->hasPermissionTo('role-list'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $roles = Role::orderBy('id','DESC')->paginate(5);

        return view('admin.roles.index',compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   
        if(!auth()->user()->hasPermissionTo('role-create'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $permissions = Permission::all();

        return view('admin.roles.create',compact('permissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        if(!auth()->user()->hasPermissionTo('role-create'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $this->validate($request, [
            'name'        => 'required|string|max:255|unique:roles,name',
            'permissions' => 'required',
        ]);

        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')->with('success','Role created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!auth()->user()->hasPermissionTo('role-list'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $role = Role::find($id);
        $rolePermissions = Permission::join("role_has_permissions","role_has_permissions.permission_id","=","permissions.id")
            ->where("role_has_permissions.role_id",$id)
            ->get();

        return view('admin.roles.show',compact('role', 'rolePermissions'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {   
        if(!auth()->user()->hasPermissionTo('role-edit'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $role = Role::find($id);
        $permissions = Permission::all();
        $rolePermissions = DB::table("role_has_permissions")
                            ->where("role_has_permissions.role_id",$id)
                            ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
                            ->all();

        return view('admin.roles.edit',compact('role','permissions', 'rolePermissions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        if(!auth()->user()->hasPermissionTo('role-edit'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'permissions' => 'required',
        ]);

        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();

        $role->syncPermissions($request->input('permissions'));

        return redirect()->route('roles.index')
                        ->with('success','Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
        if(!auth()->user()->hasPermissionTo('role-delete'))
        {
            return abort(403, 'USER DOES NOT HAVE THE RIGHT PERMISSIONS.');
        }
        Role::find($id)->delete();

        return redirect()->route('roles.index')->with('success','Role deleted successfully');
    }
}