import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 8]])
b = np.array([1, 2, 3])
c = np.array([4, 5, 6])
d = np.array([7, 8, 9])
e = np.array([10, 11, 12])

# f = np.column_stack(([b, c, d, e]))
f = np.vstack((b, c, d, e))

print(a[1:])

print(f)

# print(e.shape[0])
