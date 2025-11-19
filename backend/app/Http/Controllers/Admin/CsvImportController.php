<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MailConfiguration;
use App\Models\Categories;
use App\Models\Category;
use App\Models\SubCategory;

class CsvImportController extends Controller {

    public function index() {
        return view('admin.csv-import.index');
    }

    public function update(Request $request) {
        // dd($request->edit_id);
//        $request->validate([
//            'file' => 'required|string',
//        ]);

        $data = $request->all();

        $file = $request->file('file');
        $handle = fopen($file->path(), 'r');
        //skip the header row
        fgetcsv($handle);
        $chunksize = 1000;
        while (!feof($handle)) {
            $exceldata = [];
            for ($i = 0; $i < $chunksize; $i++) {
                $data = fgetcsv($handle);
                if ($data === false) {
                    break;
                }
                $exceldata[] = $data;
            }
        }
        fclose($handle);

        $categories_id = 0;
        $category_id = 0;
        $sub_category_id = 0;
        foreach ($exceldata as $exceldata_row) {
            if ($exceldata_row[0] != "") {
                $categories_id_Exists = Categories::where('name', $exceldata_row[0])->first();
                if ($categories_id_Exists) {
                    $categories_id = $categories_id_Exists->id;
                } else {
                    $validate1['status'] = 1;
                    $validate1['name'] = $exceldata_row[0];
                    $categories = new Categories;
                    $categories->fill($validate1);
                    $categories->save();
                    $categories_id = $categories->id;
                }
            }
//            if ($exceldata_row[1] != "") {
//                $category_id_Exists = Category::where('categories_id', $categories_id)->where('name', $exceldata_row[1])->first();
//                if ($category_id_Exists) {
//                    $category_id = $category_id_Exists->id;
//                } else {
//                    $validate2['status'] = 1;
//                    $validate2['categories_id'] = $categories_id;
//                    $validate2['name'] = $exceldata_row[1];
//                    $category = new Category;
//                    $category->fill($validate2);
//                    $category->save();
//                    $category_id = $category->id;
//                }
//            }
//            if ($exceldata_row[2] != "") {
//                $sub_category_id_Exists = SubCategory::where('categories_id', $categories_id)->where('category_id', $category_id)->where('name', $exceldata_row[2])->first();
//                if ($sub_category_id_Exists) {
//                    $sub_category_id = $sub_category_id_Exists->id;
//                } else {
//                    $validate3['status'] = 1;
//                    $validate3['categories_id'] = $categories_id;
//                    $validate3['category_id'] = $category_id;
//                    $validate3['name'] = $exceldata_row[2];
//                    $sub_category = new SubCategory;
//                    $sub_category->fill($validate3);
//                    $sub_category->save();
//                    $sub_category_id = $sub_category->id;
//                }
//            }
        }

        return response()->json(['message' => 'File import successfully'], 200);
    }

     public function export()
    {
        // Fetch data from database (Example: YourModel)
        $CategoriesData = Categories::all(['id','name']);

        // Open a file in memory
        $handle = fopen('php://output', 'w');

        // Set the header for the CSV file
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="data.csv"');
        
        // Add the column headers to the CSV file
        fputcsv($handle, ['Company Name']);

        // Loop through data and write each row to the CSV
        $CategoriesName = "";
        $SubCategoriesName = "";
        $SubSubCategoriesName = "";
        foreach ($CategoriesData as $CategoriesDataRow) {
                $CategoriesName = $CategoriesDataRow->name;
                $ExistsSubCategoriesData = Category::where('categories_id', $CategoriesDataRow->id)->get();
//                foreach($ExistsSubCategoriesData as $ExistsSubCategoriesDataRow){
//                    $SubCategoriesName = $ExistsSubCategoriesDataRow->name;
//                    $ExistsSubSubCategoriesData = SubCategory::where('categories_id', $CategoriesDataRow->id)->where('category_id', $ExistsSubCategoriesDataRow->id)->get();
//                    foreach($ExistsSubSubCategoriesData as $ExistsSubSubCategoriesDataRow){
//                        $SubSubCategoriesName = $ExistsSubSubCategoriesDataRow->name;
//                        fputcsv($handle, [$CategoriesName,$SubCategoriesName,$SubSubCategoriesName]);
//                        $CategoriesName = "";
//                        $SubCategoriesName = "";
//                        $SubSubCategoriesName = "";
//                    }
//                }
        }
        fclose($handle);
        exit();
//        return redirect()->route('admin.csv.import.index')->with('message', 'File export successfully');
//        exit();
    }
    
//    public function export()
//    {
//        // Fetch data from database (adjust based on your needs)
//        $users = Categories::all(['name', 'image', 'status']);  // Adjust with your actual table and fields
//
//        // Set headers for CSV download
//        $headers = array(
//            "Content-type" => "text/csv",
//            "Content-Disposition" => "attachment; filename=users.csv",
//            "Pragma" => "no-cache",
//            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
//            "Expires" => "0"
//        );
//
//        // Open PHP output stream
//        $output = fopen('php://output', 'w');
//
//        // Write column headers
//        fputcsv($output, ['Company Name', 'Category', 'Sub Category']);
//
//        // Write the data to the CSV file
//        foreach ($users as $user) {
//            fputcsv($output, [$user->name, $user->image, $user->status]);
//        }
//
//        // Close the output stream
//        fclose($output);
//
//        // Return the response
//        return response()->stream(function () use ($output) {
//            fclose($output);
//        }, 200, $headers);
//    }
    
//    public function export() {
//
//        $data = [
//                ['Name', 'Email', 'Age'],
//                ['John Doe', 'john@example.com', 25],
//                ['Jane Smith', 'jane@example.com', 30],
//                ['Tom Brown', 'tom@example.com', 22],
//        ];
//
//        header('Content-Type: text/csv');
//        header('Content-Disposition: attachment; filename="data.csv"');
//
//        $output = fopen('php://output', 'w');
//
//        foreach ($data as $row) {
//            fputcsv($output, $row);
//        }
//        fclose($output);
//
//
////        return redirect()->route('admin.csv.import.index')->with('message', 'File export successfully');
//    }

}
