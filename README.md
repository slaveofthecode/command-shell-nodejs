# command-shell-nodejs

## To execute use the following statement
```
> node test.js
```

## Test
Here some test that you can to use
```
// input ---------------------------------------------------------------------------------
mkdir abc
mkdir abc
cd abc
pwd
quit

// output ---------------------------------------------------------------------------------
Directory already exists
/root/abc
```

```
// input ---------------------------------------------------------------------------------
mkdir name0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
touch name0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
quit

// output ---------------------------------------------------------------------------------
Invalid File or Folder Name
Invalid File or Folder Name
```

```
// input ---------------------------------------------------------------------------------
touch root-file
mkdir sub1
cd sub1
touch sub1-file
mkdir sub2
cd sub2
touch sub2-file1
touch sub2-file2
touch sub2-file3
mkdir sub3
cd sub3
mkdir sub4
cd sub4
touch sub4-file1
touch sub4-file2
touch sub4-file3
cd ..
cd ..
cd ..
cd ..
ls -r
quit

// output ---------------------------------------------------------------------------------
/root
root-file
/root/sub1
sub1-file
/root/sub1/sub2
sub2-file1
sub2-file2
/root/sub1/sub2/sub3
/root/sub1/sub2/sub3/sub4
sub4-file1
sub4-file2
sub4-file3
```
